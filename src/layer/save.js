/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should be combined
 * into the final markup, which is then serialized by Gutenberg into post_content.
 *
 * The "save" property must be specified and must be a valid function.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
 *
 * @param {Object} props Props.
 * @returns {Mixed} JSX Frontend HTML.
 */
export default function save( { attributes } ) {
	const wrapperClasses = classnames(
		//[ `is-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
		'wp-block-layer-wp-block__layer',
		{
			hidden: false,
		} );

	const blockProps = useBlockProps.save( {
		className: wrapperClasses,
		style: {
			backgroundColor: attributes.bg_color,

			marginTop: attributes.margin_top,
			marginRight: attributes.margin_right,
			marginBottom: attributes.margin_bottom,
			marginLeft: attributes.margin_left,
		},
	} );

	return (
		<div
			{ ...blockProps }
		>
			<InnerBlocks.Content />
		</div>
	);
}
