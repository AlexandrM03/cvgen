import { IAppState } from '../states/app.state';

export const selectShared = (state: IAppState) => state.shared;

export const selectSkills = (state: IAppState) => state.shared.skills;

export const selectLanguages = (state: IAppState) => state.shared.languages;

