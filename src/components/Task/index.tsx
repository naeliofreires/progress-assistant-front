import { memo, useCallback } from 'react';
import { format, parseISO } from 'date-fns';
import NextImage from 'next/image';
import { Modal, useModalRef } from '/src/components/Modal';

import task from '/public/task.svg';
import calendar from '/public/calendar.svg';
import trash from '/public/trash.svg';
import check from '/public/check.svg';
import attention from '/public/attention.svg';

import { Props } from './types';
import * as S from './styles';

export const Task = memo(({ attributes, onDelete, onToggleStatus }: Props) => {
  const modalRef = useModalRef();

  const openAlertModal = useCallback(() => {
    modalRef.current?.open();
  }, [modalRef]);

  const closeAlertModal = useCallback(() => {
    modalRef.current?.close();
  }, [modalRef]);

  const onDeleteConfirm = () => {
    onDelete();
    closeAlertModal();
  };

  return (
    <>
      <S.Container>
        <S.CheckIconView
          checked={attributes.completed}
          onClick={onToggleStatus}
        >
          <NextImage src={check} width={25} height={25} />
        </S.CheckIconView>

        <S.InnerContainerLeft>
          <S.TaskIconView>
            <NextImage src={task} width={40} height={40} />
          </S.TaskIconView>

          <span className="title">{attributes.title}</span>
        </S.InnerContainerLeft>

        <S.InnerContainerRight>
          <S.CalendarView>
            <NextImage
              className={'teste'}
              src={calendar}
              width={22}
              height={22}
            />
            <span className="task-date">
              {format(parseISO(attributes.date), 'PPP')}
            </span>
          </S.CalendarView>

          <S.ActionsView>
            <button
              className="transparent"
              type="button"
              onClick={openAlertModal}
            >
              <NextImage src={trash} width={22} height={22} />
            </button>
          </S.ActionsView>
        </S.InnerContainerRight>
      </S.Container>

      <Modal ref={modalRef}>
        <S.DeleteAlertContainer>
          <NextImage src={attention} width={45} height={45} />
          <span>are you sure about deleting this task?</span>
          <div className="actions-view">
            <button onClick={onDeleteConfirm} type="button" name="save">
              confirm
            </button>
            <button onClick={closeAlertModal} type="button" name="cancel">
              cancel
            </button>
          </div>
        </S.DeleteAlertContainer>
      </Modal>
    </>
  );
});
