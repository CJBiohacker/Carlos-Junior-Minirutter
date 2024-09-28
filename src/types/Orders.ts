export type Order = {
	id: string;
	platform_id: string;
	line_items: [
		{
			product_id: string | null;
		}
	]
}