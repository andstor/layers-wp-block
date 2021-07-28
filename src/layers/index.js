/**
 * Internal dependencies
 */
import { layers as icon } from '../icons/layers';
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
registerBlockType( "andstor/layers-wp-block", settings );
