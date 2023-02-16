import { CreateFeedModel } from "@Models/index";

export interface StateGlobalContext {
  isLoading: boolean;
  createFeed: CreateFeedModel;
}
export interface ActionGlobalContext {
  type: string;
  data: any;
}
