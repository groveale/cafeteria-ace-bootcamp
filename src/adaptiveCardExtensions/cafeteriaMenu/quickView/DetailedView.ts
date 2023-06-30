import { BaseAdaptiveCardView, ISPFxAdaptiveCard } from "@microsoft/sp-adaptive-card-extension-base";
import { ICafeteriaMenuItem } from "../models/ICafeteriaMenuItem";
import { ICafeteriaMenuAdaptiveCardExtensionProps, ICafeteriaMenuAdaptiveCardExtensionState } from "../CafeteriaMenuAdaptiveCardExtension";

export interface IDetailedViewData {
    menuItem: ICafeteriaMenuItem
}

export class DetailedView extends BaseAdaptiveCardView<
  ICafeteriaMenuAdaptiveCardExtensionProps,
  ICafeteriaMenuAdaptiveCardExtensionState,
  IDetailedViewData
> {
    public get data(): IDetailedViewData {
        return {
            menuItem: this.state.selectedMenuItem
        }
    }

    get template(): ISPFxAdaptiveCard {
        return require('./template/DetailedViewTemplate.json');
    }
}