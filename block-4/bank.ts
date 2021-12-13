  interface IAccount{
    type: 'debit' | 'credit';
    currency: string;
    isActive: boolean;
    creationDate: string;
    expirationDate: string,
    balance?: number;
    creditLimit?: number;
    personalFunds?: number;
    usedCreditFunds?: number;
  }

  interface IClient{
    id: number;
    name: string;
    surname: string;
    registrationDate: string;
    isActive: boolean;
    accounts: IAccount[];
  }

  interface IExchangeRates {
    ccy: string;
    base_ccy: string; 
    buy: string; 
    sale: string;
  }

  interface IDebtors {
    debtors: number,
    sumDebt: number,
  }

  interface IBank {
    clients: IClient[];

    addClient(name: string, surname: string): IClient;
    findClient(id: number): IClient;
    addAccount(id: number, type: 'debit' | 'credit', currency: string): IAccount;
    convertsСurrency(rates: IExchangeRates[], initial: string, final: string, amount: number): number;
    getTotalAmountFunds(finalСгrrency: string): Promise<number>;
    getTotalAmountDebts(finalСгrrency: string): Promise<number>;
    getDebtors(isActive: boolean, finalСгrrency: string): Promise<IDebtors>;
    getExchangeRates(handleError: Function): Promise<IExchangeRates[]>;
  }

  class Bank implements IBank {
    clients: IClient[] ;
    clientId: number;

    constructor(clients: IClient[]) {
      this.clients = clients || [];
      this.clientId = 1;
    }
  
    addClient(name: string, surname: string): IClient {
      const client: IClient = {
        id: this.clientId++,
        name,
        surname,
        registrationDate: new Date().toDateString(),
        isActive: true,
        accounts: [],
      };
  
      this.clients.push(client);
  
      return client;
    }
  
    findClient(id: number): IClient {
      return this.clients.find((client) => client.id === id);
    }
  
    addAccount(id: number, type: 'debit' | 'credit', currency: string): IAccount {
      const foundСlient: IClient = this.findClient(id);
  
      const creationDate: Date = new Date();
      const expirationDate: Date = new Date(
        creationDate.setFullYear(creationDate.getFullYear() + 3)
      );
  
      const account: IAccount = {
        type,
        currency,
        isActive: true,
        creationDate: new Date().toDateString(),
        expirationDate: expirationDate.toDateString(),
      };
  
      if (type === "debit") {
        account.balance = 0;
      }
  
      if (type === "credit") {
        account.creditLimit = 1000;
        (account.personalFunds = 0),
          (account.usedCreditFunds = 0),
          (account.balance = account.creditLimit);
      }
  
      foundСlient.accounts.push(account);
  
      return account;
    }
  
    convertsСurrency(rates: IExchangeRates[], initial: string, final: string, amount: number): number {
      let initialСгrrency: IExchangeRates;
      let finalСгrrency: IExchangeRates;
      let res: number = 0;
  
      for (let rate of rates) {
        if (rate.ccy === initial) {
          initialСгrrency = rate;
        }
        if (rate.ccy === final) {
          finalСгrrency = rate;
        }
      }
  
      if (initial === final) {
        return amount;
      }
  
      if (initial === "UAH") {
        res = amount / Number(finalСгrrency.buy);
      }
  
      if (final === "UAH") {
        res = amount * Number(initialСгrrency.buy);
      }
  
      rates.forEach((rate) => {
        if (finalСгrrency) {
          if (initial === rate.ccy) {
            res = (amount * Number(rate.buy)) / Number(finalСгrrency.buy);
          }
        }
      });
  
      return Math.round(res * 100) / 100;
    }
  
    async getTotalAmountFunds(finalСгrrency: string): Promise<number> {
      const currencyRates: IExchangeRates[] = await this.getExchangeRates((error: Error) => error);
      let res: number = 0;
  
      this.clients.forEach((client) => {
        client.accounts.forEach((account) => {
          if (account.currency === finalСгrrency) {
            res += account.balance;
          } else {
            res += this.convertsСurrency(
              currencyRates,
              account.currency,
              finalСгrrency,
              account.balance
            );
          }
        });
      });
  
      return Math.round(res * 100) / 100;
    }
  
    async getTotalAmountDebts(finalСгrrency: string): Promise<number> {
      const currencyRates: IExchangeRates[] = await this.getExchangeRates((error: Error) => error);
      let res: number = 0;
  
      this.clients.forEach((client) => {
        client.accounts.forEach((account) => {
          if (account.usedCreditFunds) {
            if (account.currency === finalСгrrency) {
              res += account.usedCreditFunds;
            } else {
              res += this.convertsСurrency(
                currencyRates,
                account.currency,
                finalСгrrency,
                account.usedCreditFunds
              );
            }
          }
        });
      });
  
      return Math.round(res * 100) / 100;
    }
  
    async getDebtors(isActive: boolean, finalСгrrency: string): Promise<IDebtors> {
      const currencyRates: IExchangeRates[] = await this.getExchangeRates((error: Error) => error);
      let res: IDebtors = {
        debtors: 0,
        sumDebt: 0, 
      };
  
      for (let client of this.clients) {
        for (let account of client.accounts) {
          if (client.isActive === isActive && account.usedCreditFunds) {
              res.debtors++;
              if (account.currency === finalСгrrency) {
                res.sumDebt += account.usedCreditFunds;
              } else {
                res.sumDebt += this.convertsСurrency(
                  currencyRates,
                  account.currency,
                  finalСгrrency,
                  account.usedCreditFunds
                );
            }
          }
        }
      }
      return res;
    }
  
    async getExchangeRates(handleError: Function): Promise<IExchangeRates[]> {
      const privatbankApiUrl: string =
        "https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11";

        try {
          const data: IExchangeRates[] = await fetch(privatbankApiUrl).then((response) =>
            response.json()
          );

          return data;

        } catch (error) {   
            handleError(error)
        }
    }
  }
