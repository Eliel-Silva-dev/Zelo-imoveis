import { Environment } from '@/shared/environment';
import { Api } from '../axios-config';

export interface IListagemApartamentos {
  id: string;
  cidade: string;
  condominio: string;
}

export interface IDetalheApartamentos {
  id: string;
  cidade: string;
  condominio: string;
}

type TApartamentosComTotalCount = {
  data: IListagemApartamentos[];
  totalCount: number;
};

const getAllApartamentos = async (
  page = 1,
  filter = '',
  id = '',
): Promise<TApartamentosComTotalCount | Error> => {
  try {
    const urlRelativa = `/apartamentos?_page=${page}&_limit=${Environment.LIMITE_BUSCA_API}&nome_like=${filter}&id_like=${id}`;

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

const getApartamentosById = async (
  id: string,
): Promise<IDetalheApartamentos | Error> => {
  try {
    const { data } = await Api.get(`/apartamentos?${id}`);

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

const createApartamentos = async (
  dados: Omit<IDetalheApartamentos, 'id'>,
): Promise<string | Error> => {
  try {
    const { data } = await Api.post<IDetalheApartamentos>(
      '/apartamentos',
      dados,
    );

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

const updateApartamentoById = async (
  id: string,
  dados: IDetalheApartamentos,
): Promise<void | Error> => {
  try {
    await Api.put(`/apartamentos?${id}`, dados);
  } catch (error) {
    console.error(error);

    return new Error(
      (error as { message: string }).message || 'Erro ao atualizar o registro',
    );
  }
};

const deleteApartamentosById = async (id: string): Promise<void | Error> => {
  try {
    await Api.delete(`/apartamentos?${id}`);
  } catch (error) {
    console.error(error);

    return new Error(
      (error as { message: string }).message || 'Erro ao apagar o registro',
    );
  }
};

export {
  getAllApartamentos,
  getApartamentosById,
  createApartamentos,
  updateApartamentoById,
  deleteApartamentosById,
};
