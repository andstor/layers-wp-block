/* eslint-disable quotes */
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
import {
	ColorPalette,
	InspectorControls,
	BlockControls,
	BlockVerticalAlignmentToolbar,
	useBlockProps,
	InnerBlocks,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';

import { useSelect, useDispatch } from '@wordpress/data';

import { TextControl, PanelBody, ToggleControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

import { __ } from '@wordpress/i18n';

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
const LayerEdit = ( { attributes, setAttributes, clientId } ) => {
	const onChangeBGColor = ( hexColor ) => {
		setAttributes( { bg_color: hexColor } );
	};

	const onChangeTextColor = ( hexColor ) => {
		setAttributes( { text_color: hexColor } );
	};
	const verticalAlignment = ( hexColor ) => {
		setAttributes( { text_color: hexColor } );
	};

	const onChangeMargin = ( position, value ) => {
		const positions = [ 'top', 'right', 'bottom', 'left' ];
		if ( positions.includes( position ) ) {
			setAttributes( { [ `margin_${ position }` ]: value } );
		}
	};

	const { layersIds, hasChildBlocks, rootClientId } = useSelect(
		( select ) => {
			const { getBlockOrder, getBlockRootClientId } = select(
				blockEditorStore
			);

			const rootId = getBlockRootClientId( clientId );

			return {
				hasChildBlocks: getBlockOrder( clientId ).length > 0,
				rootClientId: rootId,
				layersIds: getBlockOrder( rootId ),
			};
		},
		[ clientId ]
	);

	const { updateBlockAttributes } = useDispatch( blockEditorStore );

	const updateAlignment = ( value ) => {
		// Update own alignment.
		setAttributes( { verticalAlignment: value } );
		// Reset parent Layers block.
		updateBlockAttributes( rootClientId, {
			verticalAlignment: null,
		} );
	};

	const classes = classnames( {
		//[ `is-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
		'wp-block-layer-wp-block__layer': attributes.preview,
	} );

	const blockProps = useBlockProps( {
		className: classes,
		style: {
			marginTop: attributes.margin_top,
			marginRight: attributes.margin_right,
			marginBottom: attributes.margin_bottom,
			marginLeft: attributes.margin_left,
		},
	} );

	const label = "okkookokoko";
	const innerBlocksProps = useInnerBlocksProps(
		{ ...blockProps, 'aria-label': label },
		{
			renderAppender: hasChildBlocks ?
				undefined :
				InnerBlocks.ButtonBlockAppender,
		}
	);

	return (

		<Fragment>
			<InspectorControls key="setting">
				<PanelBody>
					<TextControl
						label={ __( 'Top' ) }
						value={ attributes.margin_top }
						onChange={ ( value ) => onChangeMargin( 'top', value ) }
					/>
					<TextControl
						label={ __( 'Right' ) }
						value={ attributes.margin_right }
						onChange={ ( value ) => onChangeMargin( 'right', value ) }
					/>
					<TextControl
						label={ __( 'Bottom' ) }
						value={ attributes.margin_bottom }
						onChange={ ( value ) => onChangeMargin( 'bottom', value ) }
					/>
					<TextControl
						label={ __( 'Left' ) }
						value={ attributes.margin_left }
						onChange={ ( value ) => onChangeMargin( 'left', value ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...innerBlocksProps } />
		</Fragment>
	);
};

export default LayerEdit;
