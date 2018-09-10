// 09-2-3 non-nullable 타입 - strictNullChecks가 true일 때 null이나 undefined의 할당을 허용하기

let title: string | null;
title = 'Typescript Programming!';
title = null;

let title2: string | undefined;
title2 = 'Typescript Programming!';
title2 = undefined;
