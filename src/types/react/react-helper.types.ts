import { RefCallback, RefObject } from 'react';


export type Ref<Type> =
    RefCallback<Type | null>
    | RefObject<Type | null>;