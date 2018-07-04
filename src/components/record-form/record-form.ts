import { Component, Input, OnDestroy } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';

import { UUID } from 'angular2-uuid';
import * as moment from 'moment/moment';
import { Subscription } from 'rxjs/Subscription';
import { filter } from 'rxjs/operators';

import { FieldDescriptor, FormDescriptor } from '../../biosys-core/interfaces/form.interfaces';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { SchemaService } from '../../biosys-core/services/schema.service';
import { Dataset, User } from '../../biosys-core/interfaces/api.interfaces';
import { StorageService } from '../../shared/services/storage.service';

/**
 * Generated class for the RecordFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'record-form',
    templateUrl: 'record-form.html',
    providers: [SchemaService]
})
export class RecordFormComponent implements OnDestroy {
    private static readonly GEOLOCATION_TIMEOUT = 10000;
    private static readonly GEOLOCATION_MAX_AGE = 2000;

    public form: FormGroup;
    public formDescriptor: FormDescriptor;

    private _dateFieldKey: string;

    private lastLocation: Geoposition;
    private locationSubscription: Subscription;

    @Input()
    public initialiseDefaultValues = false;

    @Input()
    public set dataset(dataset: Dataset) {
        if (dataset) {
            this.setupForm(dataset);
        }
    }

    @Input()
    public readonly: boolean;

    public get invalid(): boolean {
        return !!this.form && this.form.invalid;
    }

    public get valid(): boolean {
        return !!this.form && this.form.valid;
    }

    public get dateFieldKey(): string {
        return this._dateFieldKey;
    }

    public get value(): object {
        return this.form.value;
    }

    public set value(value: object) {
        // use patch rather than set because the dataset may have changed and have new fields not set in the previously saved record
        this.form.patchValue(value);
    }

    constructor(private schemaService: SchemaService, private storageService: StorageService, private geolocation: Geolocation,
                private alertCtrl: AlertController) {}

    ngOnDestroy() {
        if (this.locationSubscription) {
            this.locationSubscription.unsubscribe();
        }
    }

    private setupForm(dataset: Dataset) {
        this.schemaService.getFormDescriptorAndGroupFromDataset(dataset).subscribe(results => {
            this.formDescriptor = results[0];
            this.form = results[1];

            if (this.formDescriptor.dateFields) {
                // use whatever is the first date field as the representative date field
                this._dateFieldKey = this.formDescriptor.dateFields[0].key;
            }

            let performInitialLocationUpdate = this.initialiseDefaultValues;

            this.locationSubscription = this.geolocation.watchPosition({
                enableHighAccuracy: true,
                timeout: RecordFormComponent.GEOLOCATION_TIMEOUT,
                maximumAge: RecordFormComponent.GEOLOCATION_MAX_AGE
            }).pipe(
                filter(position => !!position['coords']) // filter out errors
            ).subscribe(position => {
                this.lastLocation = position;

                if (performInitialLocationUpdate) {
                    this.updateLocationFields(true);
                    performInitialLocationUpdate = false;
                }
            });

            if (this.form.contains('Observer Name') || this.form.contains('Census Observers')) {
                const fieldName: string = this.form.contains('Observer Name') ? 'Observer Name' : 'Census Observers';
                const fieldDescriptor: FieldDescriptor = this.getFieldDescriptor(fieldName);

                fieldDescriptor.type = 'select';

                this.storageService.getTeamMembers().subscribe((users: User[]) => {
                        fieldDescriptor.options = users.map((user: User) => {
                            const userTitle = `${user.first_name} ${user.last_name}`.trim() || `${user.username}`.trim();

                            return {
                                name: userTitle,
                                value: userTitle
                            };
                        });
                    }
                );
            }

            if (this.initialiseDefaultValues) {
                this.initialiseDefaults();
            }
        });
    }

    public updateLocationFields(initialUpdate = false) {
        if (!this.lastLocation) {
            // don't want to show a popup immediately upon showing form the first time
            if (!initialUpdate) {
                this.alertCtrl.create({
                    title: 'Location unavailable',
                    buttons: ['OK']
                }).present();
            }

            return;
        }

        const valuesToPatch = {};

        if (this.form.contains('Latitude')) {
            valuesToPatch['Latitude'] = this.lastLocation.coords.latitude.toFixed(6);
        }

        if (this.form.contains('Longitude')) {
            valuesToPatch['Longitude'] = this.lastLocation.coords.longitude.toFixed(6);
        }

        if (this.form.contains('Accuracy')) {
            valuesToPatch['Accuracy'] = this.lastLocation.coords.accuracy;
        }

        this.form.patchValue(valuesToPatch);
    }

    public validate() {
        // need to show validation errors where appropriate for incomplete record
        if (this.form.invalid) {
            Object.keys(this.form.controls).forEach((fieldName: string) =>
                this.form.get(fieldName).markAsDirty());
        }
    }

    public getFieldError(fieldDescriptor: FieldDescriptor): string {
        if (!this.form.controls[fieldDescriptor.key].errors) {
            return '';
        }

        const errors: ValidationErrors = this.form.controls[fieldDescriptor.key].errors;
        const errorKey = Object.keys(errors)[0];
        const error = errors[errorKey];

        switch (errorKey) {
            case 'required':
                return 'This field is required';
            case 'min':
                return `Minimum value: ${error['min']}`;
            case 'max':
                return `Maximum value: ${error['max']}`;
            case 'minLength':
                return `Minimum length: ${error['minLength']}`;
            case 'maxLength':
                return `Maximum length: ${error['maxLength']}`;
            case 'pattern':
                return `Must match pattern: ${error['pattern']}`;
        }
    }

    private initialiseDefaults() {
        if (this._dateFieldKey) {
            // moment().format() will return the current date/time in local timezone
            this.form.controls[this._dateFieldKey].setValue(moment().format());
        }

        if (this.formDescriptor.hiddenFields) {
            this.formDescriptor.hiddenFields.map((field: FieldDescriptor) => {
                this.form.controls[field.key].setValue(field.defaultValue);
            });
        }

        if (this.form.contains('Census ID')) {
            this.form.controls['Census ID'].setValue(UUID.UUID());
        }

        if (this.form.contains('Observer Name') || this.form.contains('Census Observers')) {
            const fieldName: string = this.form.contains('Observer Name') ? 'Observer Name' : 'Census Observers';

            this.storageService.getCurrentUser().subscribe((currentUser: User) => this.form.controls[fieldName].
                setValue(`${currentUser.first_name} ${currentUser.last_name}`.trim() || `${currentUser.username}`.trim())
            );
        }
    }

    private getFieldDescriptor(fieldName: string): FieldDescriptor {
        let fields: FieldDescriptor[] =
            this.formDescriptor.requiredFields.filter((fieldDescriptor: FieldDescriptor) => fieldDescriptor.key === fieldName);

        if (fields.length) {
            return fields[0];
        }

        fields =
            this.formDescriptor.optionalFields.filter((fieldDescriptor: FieldDescriptor) => fieldDescriptor.key === fieldName);

        if (fields.length) {
            return fields[0];
        }

        throw new Error(`Cannot find ${fieldName} field in form descriptor`);
    }
}
