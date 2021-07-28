/**
 * Internal dependencies
 */

import { layer as icon } from '../icons/layer';
import edit from './edit';
import metadata from './metadata.js';
import save from './save';

const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const settings = {
	icon,
	...metadata,
	edit,
	save,
	//deprecated,
};
//import * as layersBlock from '.';
registerBlockType( "andstor/layer-wp-block", settings );
