import {
  CarouselNav, CarouselNavButton, CarouselNavContainer, CarouselProvider,
  carouselContextDefaultValue,
} from "@fluentui/react-components";

type Props = {
  items: readonly { id: string; title: string }[];
  selectedIndex: number;
  label: string;
  previousLabel: string;
  nextLabel: string;
  itemLabel: (title: string) => string;
  select: (index: number, direction?: number) => void;
  previous: () => void;
  next: () => void;
};

export function AlbumNavigation({ items, selectedIndex, label, previousLabel, nextLabel, itemLabel, select, previous, next }: Props) {
  return (
    // Use Fluent's public context to connect its navigation to the expanding
    // image rail. A second carousel engine would compete with swipe selection.
    <CarouselProvider value={{
      ...carouselContextDefaultValue,
      activeIndex: selectedIndex,
      circular: true,
      selectPageByIndex: (_, index) => select(index),
      selectPageByDirection: (_, direction) => {
        direction === "prev" ? previous() : next();
        return (selectedIndex + (direction === "prev" ? -1 : 1) + items.length) % items.length;
      },
    }}>
      <CarouselNavContainer
        className="album-navigation"
        layout="inline"
        prev={{ appearance: "transparent", "aria-label": previousLabel }}
        next={{ appearance: "transparent", "aria-label": nextLabel }}
      >
        <CarouselNav totalSlides={items.length} appearance="brand" aria-label={label}>
          {index => (
            <CarouselNavButton
              id={`gallery-tab-${items[index].id}`}
              data-gallery-dot={items[index].id}
              aria-label={itemLabel(items[index].title)}
              aria-controls="chart-gallery"
            />
          )}
        </CarouselNav>
      </CarouselNavContainer>
    </CarouselProvider>
  );
}
