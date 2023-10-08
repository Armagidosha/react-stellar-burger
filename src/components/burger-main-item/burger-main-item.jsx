import { memo, useRef } from "react";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-main-item.module.css'
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { removeIngredient } from "../../services/slices/burger-slice";

export const BurgerMainItem = memo(({ingredient, index, _id, moveCard}) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [{handlerId}, drop] = useDrop({
    accept: 'sort',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
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
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
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
    <li ref={ref} key={ingredient.uuid} style={{opacity}} data-handler-id={handlerId} className={styles.ingredients_li}>
    <DragIcon />
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
