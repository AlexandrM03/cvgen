import { CvDto } from '../../dto/cv.dto';

export interface CvState {
    cvs: CvDto[];
    cv: CvDto;
}

export const cvInitialState: CvState = {
    cvs: [],
    cv: null
};