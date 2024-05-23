import { createAction, props } from '@ngrx/store';
import { CvDto } from '../../dto/cv.dto';

export enum CvActionsEnum {
    GET_CVS = '[Cv] Get Cvs',
    GET_CVS_SUCCESS = '[Cv] Get Cvs Success',
    CREATE_CV = '[Cv] Create Cv',
    CREATE_CV_SUCCESS = '[Cv] Create Cv Success',
    GET_CV = '[Cv] Get Cv',
    GET_CV_SUCCESS = '[Cv] Get Cv Success',
    UPDATE_CV = '[Cv] Update Cv',
    UPDATE_CV_SUCCESS = '[Cv] Update Cv Success',
    DELETE_CV = '[Cv] Delete Cv',
    DELETE_CV_SUCCESS = '[Cv] Delete Cv Success',
}

export const getCvs = createAction(
    CvActionsEnum.GET_CVS,
    props<{ id: string }>()
);

export const getCvsSuccess = createAction(
    CvActionsEnum.GET_CVS_SUCCESS,
    props<{ cvs: CvDto[] }>()
);

export const createCv = createAction(
    CvActionsEnum.CREATE_CV,
    props<{ id: string }>()
);

export const createCvSuccess = createAction(
    CvActionsEnum.CREATE_CV_SUCCESS,
    props<{ cv: CvDto }>()
);

export const getCv = createAction(
    CvActionsEnum.GET_CV,
    props<{ id: string }>()
);

export const getCvSuccess = createAction(
    CvActionsEnum.GET_CV_SUCCESS,
    props<{ cv: CvDto }>()
);

export const updateCv = createAction(
    CvActionsEnum.UPDATE_CV,
    props<{ cv: CvDto }>()
);

export const updateCvSuccess = createAction(
    CvActionsEnum.UPDATE_CV_SUCCESS,
    props<{ cv: CvDto }>()
);

export const deleteCv = createAction(
    CvActionsEnum.DELETE_CV,
    props<{ id: string }>()
);

export const deleteCvSuccess = createAction(
    CvActionsEnum.DELETE_CV_SUCCESS,
    props<{ id: string }>()
);