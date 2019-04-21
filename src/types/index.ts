import { History } from 'history';
import { LocationState, Path } from 'history';
import { CallHistoryMethodAction } from 'connected-react-router';

export type RouterHistory = () => History;
export type Push = (url: string) => CallHistoryMethodAction<[Path, LocationState?]>;
