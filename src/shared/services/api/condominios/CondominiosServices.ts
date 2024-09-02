import { Environment } from '@/shared/environment';
import { Api } from '../axios-config';

export interface IListagemCondominios {
  id: string;
  cidade: string;
  condominio: string;
}

export interface IDetalheCondominios {
  id: string;
  cidade: string;
  condominio: string;
}

type TCondominiosComTotalCount = {
  data: IListagemCondominios[];
  totalCount: number;
};

const getAllCondominios = async (
  page = 1,
  filter = '',
  id = '',
): Promise<TCondominiosComTotalCount | Error> => {
  try {
    const urlRelativa = `/condominio?_page=${page}&_limit=${Environment.LIMITE_BUSCA_API}&nome_like=${filter}&id_like=${id}`;

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

const getCondominiosById = async (id: string): Promise<IDetalheCondominios | Error> => {
  try {
    const { data } = await Api.get(`/condominio?${id}`);

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

const createCondominios = async (
  dados: Omit<IDetalheCondominios, 'id'>,
): Promise<string | Error> => {
  try {
    const { data } = await Api.post<IDetalheCondominios>('/condominio', dados);

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

const updateCondominioById = async (
  id: string,
  dados: IDetalheCondominios,
): Promise<void | Error> => {
  try {
    await Api.put(`/condominio?${id}`, dados);
  } catch (error) {
    console.error(error);

    return new Error(
      (error as { message: string }).message || 'Erro ao atualizar o registro',
    );
  }
};

const deleteCondominiosById = async (id: string): Promise<void | Error> => {
  try {
    await Api.delete(`/condominio?${id}`);
  } catch (error) {
    console.error(error);

    return new Error(
      (error as { message: string }).message || 'Erro ao apagar o registro',
    );
  }
};

export {
  getAllCondominios as getAllCondominios,
  getCondominiosById,
  createCondominios,
  updateCondominioById,
  deleteCondominiosById,
};
