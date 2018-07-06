// 08-3-4 모듈을 재노출해 사용하기 - 가져온 모든 모듈을 재노출 - 재노출 모듈을 임포트할 때는 별칭을 추가해 임포트 함

import * as m from './modules';
m.setAge(20);
m.setName('happy');
