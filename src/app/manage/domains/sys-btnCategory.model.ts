import { SysBtnRegister } from './sys-btnregister.model';

export interface SysBtnCategory {
    code: string;
    name: string;
    buttonItems: SysBtnRegister[];
}
