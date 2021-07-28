/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
//  Import CSS.
import './editor.scss';
import './style.scss';
import { dropRight, get, times } from 'lodash';

import {
	compose,
	ColorPalette,
	InspectorControls,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
	InnerBlocks,
	store as blockEditorStore,
} from '@wordpress/block-editor';

import {
	Notice,
	PanelBody,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';

import {
	createBlock,
	createBlocksFromInnerBlocksTemplate,
	store as blocksStore,
} from '@wordpress/blocks';
import { Fragment } from '@wordpress/element';

import { withDispatch, useDispatch, useSelect } from '@wordpress/data';

import { __ } from '@wordpress/i18n';

const ALLOWED_BLOCKS = [ 'andstor/layer-wp-block' ];
const TEMPLATE = [
	[ 'andstor/layer-wp-block'],
	[ 'andstor/layer-wp-block'],
];

/**
	* The edit function describes the structure of your block in the context of the editor.
	* This represents what the editor will render when the block is used.
	*
	* The "edit" property must be a valid function.
	*
	* @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	*
	* @param {Object} props Props.
	* @returns {Mixed} JSX Component.
	*/
const Layers = ( { attributes, setAttributes, clientId, setPreview, updateLayers } ) => {
	const { isStackedOnMobile, preview } = attributes;

	const { count } = useSelect(
		( select ) => {
			return {
				count: select( blockEditorStore ).getBlockCount( clientId ),
			};
		},
		[ clientId ]
	);

	const onChangeBGColor = ( hexColor ) => {
		setAttributes( { bg_color: hexColor } );
	};

	const onChangeTextColor = ( hexColor ) => {
		setAttributes( { text_color: hexColor } );
	};

	const classes = classnames( {
		'wp-block-layers-wp-block__wrapper': preview,
	} );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
		renderAppender: false,
	} );

	return (

		<Fragment>
			<InspectorControls key="setting">
				<PanelBody>
					<ToggleControl
						label={ __( 'Preview' ) }
						checked={ preview }
						onChange={ setPreview }
					/>
					<RangeControl
						label={ __( 'Layers' ) }
						value={ count }
						onChange={ ( value ) => updateLayers( count, value ) }
						min={ 1 }
						max={ Math.max( 10, count ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...innerBlocksProps } />
		</Fragment>
	);
};

const LayerWrapper = withDispatch(
	( dispatch, ownProps, registry ) => ( {
		/**
		 * Update all child Layer blocks with a new preview setting
		 * based on whatever preview is passed in. This allows change to parent
		 * to overide anything set on a individual layer basis.
		 *
		 * @param {string} preview the preview setting
		 */
		setPreview( preview ) {
			const { clientId, setAttributes } = ownProps;
			const { updateBlockAttributes } = dispatch( blockEditorStore );
			const { getBlockOrder } = registry.select( blockEditorStore );

			// Update own preview.
			setAttributes( { preview } );

			// Update all child Layer Blocks to match
			const innerBlockClientIds = getBlockOrder( clientId );
			innerBlockClientIds.forEach( ( innerBlockClientId ) => {
				updateBlockAttributes( innerBlockClientId, {
					preview: preview,
				} );
			} );
		},

		/**
		 * Updates the layer count, including necessary revisions to child Layer
		 * blocks to grant required or redistribute available space.
		 *
		 * @param {number} previousLayers Previous layer count.
		 * @param {number} newLayers      New layer count.
		 */
		updateLayers( previousLayers, newLayers ) {
			const { clientId, attributes } = ownProps;
			const { replaceInnerBlocks } = dispatch( blockEditorStore );
			const { getBlocks } = registry.select( blockEditorStore );

			let innerBlocks = getBlocks( clientId );
			// Redistribute available width for existing inner blocks.
			const isAddingLayer = newLayers > previousLayers;

			if ( isAddingLayer ) {
				innerBlocks = [
					...innerBlocks,
					...times( newLayers - previousLayers, () => {
						return createBlock( 'andstor/layer-wp-block', {
							preview: attributes.preview,
						} );
					} ),
				];
			} else {
				// The removed layer will be the last of the inner blocks.
				innerBlocks = dropRight(
					innerBlocks,
					previousLayers - newLayers
				);
			}

			replaceInnerBlocks( clientId, innerBlocks );
		},
	} )
)( Layers );

export default LayerWrapper;
