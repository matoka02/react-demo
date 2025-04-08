import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import React, { useState, useCallback, useEffect, useMemo } from 'react';

import CartIcon from '@/components/product/CartIcon';
import ProductFilters, { FiltersProps } from '@/components/product/ProductFilters';
import ProductItem from '@/components/product/ProductItem';
import ProductSort from '@/components/product/ProductSort';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { fetchAllProducts } from '@/stores/products/productThunk';
import { RootState } from '@/stores/store';

// ----------------------------------------------------------------------

// Constants
const GENDER_OPTIONS = [
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'kids', label: 'Kids' },
];
const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'shoes', label: 'Shoes' },
  { value: 'apparel', label: 'Apparel' },
  { value: 'accessories', label: 'Accessories' },
];
const RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];
const PRICE_OPTIONS = [
  { value: 'below', label: 'Below $25' },
  { value: 'between', label: 'Between $25 - $75' },
  { value: 'above', label: 'Above $75' },
];
const COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];
const defaultFilters = {
  price: '',
  gender: [GENDER_OPTIONS[0].value],
  colors: [COLOR_OPTIONS[4]],
  rating: RATING_OPTIONS[0],
  category: CATEGORY_OPTIONS[0].value,
};
const PAGE_SIZE = 12;
const PAGE_COUNT = 10;

function ProductView(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { products: allProducts } = useAppSelector((state: RootState) => state.products);

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('featured');
  const [openFilter, setOpenFilter] = useState(false);
  const [filters, setFilters] = useState<FiltersProps>(defaultFilters);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const pagedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return allProducts.slice(start, end);
  }, [allProducts, page]);

  const totalPages =
    allProducts.length <= PAGE_SIZE * PAGE_COUNT
      ? PAGE_COUNT
      : Math.ceil(allProducts.length / PAGE_SIZE);

  const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleOpenFilter = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const handleCloseFilter = useCallback(() => {
    setOpenFilter(false);
  }, []);

  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort);
  }, []);

  const handleSetFilters = useCallback((updateState: Partial<FiltersProps>) => {
    setFilters((prevValue) => ({ ...prevValue, ...updateState }));
  }, []);

  const canReset = Object.keys(filters).some(
    (key) => filters[key as keyof FiltersProps] !== defaultFilters[key as keyof FiltersProps]
  );
  return (
    <>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1} sx={{ mb: 5 }}>
          Products
        </Typography>

        <Box gap={1} display="flex" flexShrink={0} sx={{ my: 1 }}>
          <ProductFilters
            canReset={canReset}
            filters={filters}
            onSetFilters={handleSetFilters}
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
            onResetFilter={() => setFilters(defaultFilters)}
            options={{
              genders: GENDER_OPTIONS,
              categories: CATEGORY_OPTIONS,
              ratings: RATING_OPTIONS,
              price: PRICE_OPTIONS,
              colors: COLOR_OPTIONS,
            }}
          />

          <ProductSort sortBy={sortBy} onSort={handleSort} options={SORT_OPTIONS} />
        </Box>
      </Box>

      <CartIcon totalItems={8} />

      <Grid container spacing={3}>
        {pagedProducts.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', my: 8, mx: 'auto' }}>
        <Pagination count={totalPages} color="primary" page={page} onChange={handlePageChange} />
      </Box>
    </>
  );
}

export default ProductView;
