const { __ } = wp.i18n; // Import __() from wp.i18n

const metadata = {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	apiVersion: 2,
	title: __( 'Layers' ), // Block title.
	category: 'design',	// Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'layers' ),
		__( 'stack' ),
		__( 'overlay' ),
	],
	attributes: {
		preview: {
			type: 'boolean',
			default: false,
		},
	},
	supports: {
		anchor: true,
		align: [ 'wide', 'full' ],
		html: false,
		color: {
			gradients: true,
			link: true,
		},
	},
};

export default metadata;
