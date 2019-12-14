import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
//import { escape } from '@microsoft/sp-lodash-subset';

require('./style.css');
// import styles from './ViewAllListsWebPart.module.scss';
//import * as strings from 'ViewAllListsWebPartStrings';

export interface IViewAllListsWebPartProps {
  description: string;
  detailDescription: string;  
  dropdownValue: string;
  lists: string | string[]; // Stores the list ID(s)
}

export default class ViewAllListsWebPart extends BaseClientSideWebPart<IViewAllListsWebPartProps> {
  
  public render(): void {
    
    var html = `
        <div>
          <h3 class="header">${this.context.pageContext.web.title}</h3>
          <h3>Today's Date : ${(new Date()).toLocaleString('en-us')}</h2>
          <h2 class="header">This is awesome</h2>
          <p>${this.properties.description}</p>
        </div>
        <ul>
      `;
      this._getData().then(response => {
        console.log('REsponse is ',response);
        response.value.forEach(list => {
          html +=`<li>${list.Title} - ${list.ItemCount} Items</li>`; 
        });
        html +=  '</ul>';
        this.domElement.innerHTML =html;
      }, error => {console.error('Oops Error', error);});
  }

  private _getData(): Promise<any> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists?$filter=Hidden eq false`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'View All Lists'
          },
          groups: [
            {
              groupName: 'General Settings',
              groupFields: [
                PropertyPaneTextField('description', {
                  label: 'Description'
                }),
                PropertyFieldListPicker('lists', {
                  label: 'Select a list',
                  selectedList: this.properties.lists,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  multiSelect: true,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                }),
                PropertyPaneTextField('detailDescription', {
                  label: 'Detail Description',
                  multiline: true,
                  rows: 5
                }),
                PropertyPaneDropdown('dropdownValue', {
                  label: 'Detail Description',
                  options: [ 
                    { key: 'Red', text: 'Red' }, 
                    { key: 'Green', text: 'Green' }, 
                    { key: 'DarkBlue', text: 'Dark blue' } 
                  ] 
                  
                }),

              ]
            }
          ]
        }
      ]
    };
  }
}
