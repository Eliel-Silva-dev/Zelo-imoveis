import { Environment } from '@/shared/environment';
import { Api } from '../axios-config';

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

const getAllImoveis = async (
  page = 1,
  filter = '',
  id = '',
): Promise<TImoveisComTotalCount | Error> => {
  try {
    const urlRelativa = `/imoveis?_page=${page}&_limit=${Environment.LIMITE_BUSCA_API}&nome_like=${filter}&id_like=${id}`;

    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(
          headers['x-total-count'] || Environment.LIMITE_BUSCA_API,
        ),
      };
    }

    return new Error('Erro ao listar os registro');
  } catch (error) {
    console.error(error);

    return new Error(
      (error as { message: string }).message || 'Erro ao listar os registros',
    );
  }
};

const getImoveisById = async (id: string): Promise<IDetalheImoveis | Error> => {
  try {
    const { data } = await Api.get(`/imoveis?${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro');
  } catch (error) {
    console.error(error);

    return new Error(
      (error as { message: string }).message || 'Erro ao consultar o registro',
    );
  }
};

const createImoveis = async (
  dados: Omit<IDetalheImoveis, 'id'>,
): Promise<string | Error> => {
  try {
    const { data } = await Api.post<IDetalheImoveis>('/imoveis', dados);

    if (data) {
      return data.id;
    }

    return new Error('Erro ao criar o registro');
  } catch (error) {
    console.error(error);

    return new Error(
      (error as { message: string }).message || 'Erro ao criar o registro',
    );
  }
};
export { getAllImoveis, getImoveisById, createImoveis };
