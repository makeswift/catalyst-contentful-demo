import { forwardRef, Ref, useId } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselNextIndicator,
  CarouselPreviousIndicator,
  CarouselSlide,
} from '@bigcommerce/components/carousel';
import { cn } from '~/lib/utils';

import { ProductPreview, type Props as ProductPreviewProps } from '../ui/product-preview';

interface Props {
  className: string;
  title?: string;
  products: ProductPreviewProps[];
}

export const CarouselStatic = forwardRef(function CarouselStatic(
  { className, title, products }: Props,
  ref: Ref<HTMLDivElement>,
) {
  const id = useId();

  if (products.length === 0) {
    return (
      <div className={cn(className, 'w-full bg-gray-100 text-center')}>
        No products have been added
      </div>
    );
  }

  return (
    <Carousel aria-labelledby="Carousel" className={cn(className)} ref={ref}>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black lg:text-4xl" id="title">
          {title}
        </h2>
        <span className="no-wrap flex">
          <CarouselPreviousIndicator />
          <CarouselNextIndicator />
        </span>
      </div>
      <CarouselContent>
        {products.map((product, index) => (
          <CarouselSlide
            aria-label={`${index + 1} of ${products.length}`}
            id={`${id}-slide-${index + 1}`}
            index={index}
            key={index}
          >
            <ProductPreview
              buttonText={product.buttonText}
              image={product.image}
              imageAlt={product.imageAlt}
              key={index}
              link={product.link}
            />
          </CarouselSlide>
        ))}
      </CarouselContent>
    </Carousel>
  );
});
