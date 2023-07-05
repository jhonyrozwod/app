import Candle from '@/models/Candle';
import axios from 'axios';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';

const http = axios.create({
  baseURL: 'http://localhost:3000'
});

@Module({ name: 'CandleStore' })
export default class CandleStore extends VuexModule {
  private _candles: Candle[] = [];

  get candles() {
    return this._candles.length > 0
      ? this._candles.map(c => ({
          x: c.finalDateTime.toLocaleTimeString(),
          y: [c.open, c.high, c.low, c.close]
        }))
      : [];
  }

  @Action
  async loadInitialCandles() {
    const result = await http.get(`${'/candles'}/10`);
    const candlesObj = result.data;
    const candles: Candle[] = candlesObj.map((c: any) => new Candle(c));
    this._initializeCandles(candles.reverse());
  }

  @Action
  addCandle(candle: Candle) {
    this._appendNewCandle(candle);
  }

  @Mutation
  private _initializeCandles(candles: Candle[]) {
    this._candles = candles;
  }

  @Mutation
  private _appendNewCandle(candle: Candle) {
    this._candles.push(candle);
  }
}