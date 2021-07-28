const { __ } = wp.i18n; // Import __() from wp.i18n

const metadata = {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	apiVersion: 2,
	title: __( 'Layer' ), // Block title.
	//icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	parent: [ 'andstor/layers-wp-block' ],
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'layer' ),
		__( 'stack' ),
		__( 'overlay' ),
	],
	attributes: {
		preview: {
			type: 'boolean',
			default: false,
		},
		margin_top: { type: 'string', default: '0' },
		margin_right: { type: 'string', default: '0' },
		margin_left: { type: 'string', default: '0' },
		margin_bottom: { type: 'string', default: '0' },
	},
	supports: {
		anchor: true,
		reusable: false,
		html: false,
		color: {
			gradients: true,
			link: true,
		},
	},
};

export default metadata;
