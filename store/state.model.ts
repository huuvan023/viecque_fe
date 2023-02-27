import { CreateFeedModel } from "@Models/index";

export interface StateGlobalContext {
  isLoading: boolean;
  createFeed: CreateFeedModel;
  role: string;
}
export interface ActionGlobalContext {
  type: string;
  data: any;
}
