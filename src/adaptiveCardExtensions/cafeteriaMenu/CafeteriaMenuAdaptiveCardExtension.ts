import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { CafeteriaMenuPropertyPane } from './CafeteriaMenuPropertyPane';

export interface ICafeteriaMenuAdaptiveCardExtensionProps {
  title: string;
}

export interface ICafeteriaMenuAdaptiveCardExtensionState {
  menuItems: any[];
  selectedMenuItem: any;
}

const CARD_VIEW_REGISTRY_ID: string = 'CafeteriaMenu_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'CafeteriaMenu_QUICK_VIEW';

export default class CafeteriaMenuAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  ICafeteriaMenuAdaptiveCardExtensionProps,
  ICafeteriaMenuAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: CafeteriaMenuPropertyPane;

  public onInit(): Promise<void> {
    this.state = { 
      menuItems: [],
      selectedMenuItem: undefined
    };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'CafeteriaMenu-property-pane'*/
      './CafeteriaMenuPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.CafeteriaMenuPropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }
}
