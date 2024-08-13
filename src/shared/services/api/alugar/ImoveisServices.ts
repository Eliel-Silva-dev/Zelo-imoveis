import { Environment } from "@/shared/environment";
import { Api } from "../axios-config";

export interface IListagemImoveis {
  id: string;
  cidade: string;
  condominio: string;
}

export interface IDetalheImoveis {
  id: string;
  cidade: string;
  condominio: string;
}

type TImoveisComTotalCount = {
  data: IListagemImoveis[];
  totalCount: number;
};

export {alugarServices};