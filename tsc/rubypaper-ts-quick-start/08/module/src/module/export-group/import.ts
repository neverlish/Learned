// 08-3-3 여러 모듈을 함께 export 하기 - 노출된 인터페이스와 함수를 호출

import { IProfile, save } from './export';

let profile: IProfile = {};
save(profile, 'happy');
