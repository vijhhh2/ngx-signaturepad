import { PointGroup } from 'signature_pad';

// Need to support svg, arrayBuffer, and blob
export type OutputType = 'dataURL' | 'data';

export type InputType = string | Array<PointGroup>;
