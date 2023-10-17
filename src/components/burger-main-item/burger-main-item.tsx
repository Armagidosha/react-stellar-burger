import styles from './burger-main-item.module.css'
import { FC, memo, useRef } from "react";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "../../utils/hooks";
import { XYCoord, useDrag, useDrop } from "react-dnd";
import { removeIngredient } from "../../services/slices/burger-slice";
import { Ingredients } from "../../types/types";

type BurgerMainItemProps = {
  ingredient: Ingredients
  index: number
  _id: string
  moveCard: (dragIndex: number, hoverIndex: number) => void
}

type Item = {
  index: number
  _id: string
}

export const BurgerMainItem: FC<BurgerMainItemProps> = memo(({ ingredient, index, _id, moveCard }) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'sort',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: Item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'sort',
    item: () => {
      return { _id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
  })

  const opacity = isDragging ? 0 : 1

  drag(drop(ref))

  return (
    <li ref={ref} key={ingredient.uuid} style={{ opacity }} data-handler-id={handlerId} className={styles.ingredients_li}>
      <DragIcon type='primary' />
      <ConstructorElement
        isLocked={false}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => dispatch(removeIngredient(ingredient))}
      />
    </li>
  )
}) 
