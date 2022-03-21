import React, { useImperativeHandle, useRef, useState } from 'react';

import { ModalRef } from '/src/components/Modal/types';

import * as S from './styles';

export const useModalRef = () => useRef<ModalRef>(null);

export const Modal = React.forwardRef<ModalRef, { children: React.ReactNode }>(
  (props, ref) => {
    const [open, setOpen] = useState(false);

    /**
     * @Controllers
     */
    const _open = useRef(() => setOpen(true)).current;
    const _close = useRef(() => setOpen(false)).current;
    useImperativeHandle(ref, () => ({ open: _open, close: _close }));

    return (
      <React.Fragment>
        {open && <S.Container>{props.children}</S.Container>}
      </React.Fragment>
    );
  }
);
