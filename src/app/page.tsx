import styles from './page.module.css';

export default function Home() {
  return (
    <main id={styles.main_home}>
      <h2>Referência em locação e vendas em Campinas</h2>
      <div>
        <div>
          <div>
            <label>Finalidade</label>
            <div>
              <select id="finalidade">
                <option value="1">Alugar</option>
                <option value="2">Comprar</option>
              </select>
            </div>
          </div>
          <div>
            <label>Tipo</label>
            <div>
              <select id="tipo">
                <option value="0">Carregando...</option>
              </select>
            </div>
          </div>

          <div>
            <label>Localização</label>
            <div>
              <input id="endereco" type="text" placeholder="Bairro ou Cidade" />
            </div>
            <ul id="lista-endereco"></ul>
          </div>

          <div>
            <label>Quartos</label>
            <div>
              <select id="quartos">
                <option value="0">Quartos</option>
                <option value="1-quartos">1 Quarto</option>
                <option value="2-quartos">2 Quartos</option>
                <option value="3-quartos">3 Quartos</option>
                <option value="4-quartos">4+ Quartos</option>
              </select>
            </div>
          </div>
          <div>
            <label>Valor</label>
            <div>
              <input id="input_valor_min" type="text" />
              <input id="input_valor_max" type="text" />
            </div>
          </div>

          <div id="container-cond">
            <label>Condomínios</label>
            <div>
              <select id="condominio">
                <option value="0">Condomínio</option>
              </select>
            </div>
          </div>

          <div>
            <button id="submit-busca" type="submit">
              BUSCAR IMÓVEIS
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
