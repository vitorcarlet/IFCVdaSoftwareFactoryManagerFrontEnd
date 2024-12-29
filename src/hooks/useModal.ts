"use client";

import {
  ModalGlobalContext,
  ModalGlobalProviderStates,
} from "../contexts/ModalContext";
import { useContext } from "react";

/* export const useGlobalModal = <T extends ModalGlobalProviderStates>() =>
  useContext<T>(ModalGlobalContext) */

// TODO: Tipar o contexto para que possa passar qual tipo de dados que a chave currentItem tem

type ConsumerGlobalModal<T> = Omit<ModalGlobalProviderStates, "currentItem"> & {
  currentItem: T | null;
};
type GlobalModalFunction = <T = any>() => ConsumerGlobalModal<T>;

export const useModal: GlobalModalFunction = () =>
  useContext(ModalGlobalContext);

// export const useGlobalModal = () => useContext(ModalGlobalContext)
