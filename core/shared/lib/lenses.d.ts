type Lens = any[] | any;
type Transform = any;
type Traversal = any;
type Optic = any;
type Iso = any;

export const camelKebab: Transform;
export const kebabCamel: Transform;
export const Obs: { object: Iso };
export const hexString: Lens;
export const showAsPair: Lens;

export const toPx: Lens;
export const toPct: Lens;
export const toPctU: Lens;
export const toRem: Lens;
export const toColor: Lens;

export const toCssTransform: (k: string) => Lens;
