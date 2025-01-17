import { Environment } from '@/shared/environment';
import { Api } from '../axios-config';

export interface IListagemImoveis {
  id: string;
  imgsCardImovel: string[];
  imgsCardAlt: string;
  localImovel: string;
  descriptionImovel: string;
  valuationImovel: number;
  qtdQuartos: number;
  qtdVagas: number;
  bestImovel: string;
  typeImovel: string;
  finalidadeImovel: string[];
  cidadeImovel: string;
  bairroImovel: string;
  nomeCondominio: string;
  dimensoesImovel: number;
  dimensaoTotal: string;
  qtdBanheiros: number;
  qtdSuite: number;
  longDesc: string;
  caracteristicasInternas: string[];
  caracteristicasExternas: string[];
  lazer: string[];
  caracteristicasExtras: string[];
}
export interface IDetalheImoveis {
  id: string;
  imgsCardImovel: string[];
  imgsCardAlt: string;
  localImovel: string;
  descriptionImovel: string;
  valuationImovel: number;
  qtdQuartos: number;
  qtdVagas: number;
  bestImovel: string;
  typeImovel: string;
  finalidadeImovel: string[];
  cidadeImovel: string;
  bairroImovel: string;
  nomeCondominio: string;
  dimensoesImovel: number;
  dimensaoTotal: string;
  qtdBanheiros: number;
  qtdSuite: number;
  longDesc: string;
  caracteristicasInternas: string[];
  caracteristicasExternas: string[];
  lazer: string[];
  caracteristicasExtras: string[];
}

type TImoveisComTotalCount = {
  data: IListagemImoveis[];
  totalCount: number;
};

const getAllImoveis = async (
  page = 1,
  finalidade = '',
  best = '',
  id = '',
  type = '',
  cidade = '',
  bairro = '',
  condominio = '',
  quartos = '',
  maxValue = '',
): Promise<TImoveisComTotalCount | Error> => {
  try {
    const urlRelativa = `/imoveis?_page=${page}&_limit=${Environment.LIMITE_BUSCA_API}&finalidadeImovel_like=${finalidade}&bestImovel_like=${best}&id_like=${id}&typeImovel_like=${type}&cidadeImovel_like=${cidade}&bairroImovel_like=${bairro}&nomeCondominio_like=${condominio}&qtdQuartos_like=${quartos}&valuationImovel_gte=${maxValue}`;
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

const getImovelById = async (id: string): Promise<IDetalheImoveis | Error> => {
  try {
    const { data } = await Api.get<IDetalheImoveis>(`/imoveis/${id}`);
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

const updateImoveilById = async (
  id: string,
  dados: IDetalheImoveis,
): Promise<void | Error> => {
  try {
    await Api.put(`/imoveis?${id}`, dados);
  } catch (error) {
    console.error(error);

    return new Error(
      (error as { message: string }).message || 'Erro ao atualizar o registro',
    );
  }
};

const deleteImoveisById = async (id: string): Promise<void | Error> => {
  try {
    await Api.delete(`/imoveis?${id}`);
  } catch (error) {
    console.error(error);

    return new Error(
      (error as { message: string }).message || 'Erro ao apagar o registro',
    );
  }
};

export {
  getAllImoveis,
  getImovelById as getImoveisById,
  createImoveis,
  updateImoveilById,
  deleteImoveisById,
};
