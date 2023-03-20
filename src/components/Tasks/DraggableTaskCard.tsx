import type { XYCoord } from 'react-dnd';
import type { Identifier } from 'dnd-core';
import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import TaskCard, { TaskCardProps } from './TaskCard';
import { useAppContext } from '../../context/AppContext';

interface DragCardItem {
  index: number;
  id: number;
  type: string;
}

const cardItemTypes = {
  CARD: 'card',
};

type Props = {
  cardIndex: number;
} & TaskCardProps;

const DraggableTaskCard: FC<Props> = ({ cardIndex, ...taskProps }) => {
  const { moveTask, updateTasksOrderIndexFromList } = useAppContext();
  const cardRef = useRef<HTMLDivElement>(null);
  const { task } = taskProps;

  const [{ handlerId }, drop] = useDrop<
    DragCardItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: cardItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    drop(item) {
      updateTasksOrderIndexFromList();
    },
    hover(item: DragCardItem, monitor) {
      if (!cardRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = cardIndex;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = cardRef.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveTask(dragIndex, hoverIndex);

      // eslint-disable-next-line no-param-reassign
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: cardItemTypes.CARD,
    item: () => {
      return { id: task._id, index: cardIndex };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(cardRef));
  return (
    <TaskCard
      ref={cardRef}
      handlerId={handlerId}
      isDragging={isDragging}
      {...taskProps}
    />
  );
};

export default DraggableTaskCard;
