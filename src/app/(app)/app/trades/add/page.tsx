"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tradeSchema, TradeFormValues } from "@/lib/validations";
import { LOT_SIZES, CHARGE_RATES } from "@/lib/constants";
import { formatCurrency } from "@/lib/format";

import { apiClient } from "@/lib/api-client";

interface SymbolItem {
  symbol: string;
  name: string;
  lot_size: number;
}

interface SymbolData {
  indices: SymbolItem[];
  stocks: SymbolItem[];
}

export default function AddTradePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [symbols, setSymbols] = useState<SymbolData | null>(null);
  const [isLoadingSymbols, setIsLoadingSymbols] = useState(true);
  const totalSteps = 3;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TradeFormValues>({
    resolver: zodResolver(tradeSchema) as any,
    defaultValues: {
      underlying: 'BANKNIFTY',
      instrument_type: 'CE',
      action: 'BUY',
      lots: 1,
      lot_size: 15,
    }
  });

  const watchUnderlying = watch("underlying");
  const watchLots = watch("lots");
  const watchEntryPrice = watch("entry_price");
  const watchExitPrice = watch("exit_price");
  const watchAction = watch("action");

  // Fetch symbols
  useEffect(() => {
    async function fetchSymbols() {
      try {
        const res = await apiClient('/symbols');
        if (res.ok) {
          const data = await res.json();
          setSymbols(data);
        }
      } catch (error) {
        console.error('Failed to fetch symbols:', error);
      } finally {
        setIsLoadingSymbols(false);
      }
    }
    fetchSymbols();
  }, []);

  // Update lot size when underlying changes
  useEffect(() => {
    if (!symbols) return;
    
    const allSymbols = [...symbols.indices, ...symbols.stocks];
    const selectedSymbol = allSymbols.find(s => s.symbol === watchUnderlying);
    
    if (selectedSymbol) {
      setValue('lot_size', selectedSymbol.lot_size);
    }
  }, [watchUnderlying, symbols, setValue]);

  // Calculate charges
  const calculateCharges = () => {
    const brokerage = CHARGE_RATES.BROKERAGE_PER_ORDER * 2; // Entry + Exit
    const turnover = (watchEntryPrice || 0) * (watchLots || 0) * watch('lot_size') + (watchExitPrice || 0) * (watchLots || 0) * watch('lot_size');
    const sellValue = (watchExitPrice || 0) * (watchLots || 0) * watch('lot_size');
    
    const stt = watchAction === 'BUY' ? sellValue * CHARGE_RATES.STT_OPTIONS_SELL : (watchEntryPrice || 0) * (watchLots || 0) * watch('lot_size') * CHARGE_RATES.STT_OPTIONS_SELL;
    const exchangeCharges = turnover * CHARGE_RATES.EXCHANGE_CHARGES;
    const gst = (brokerage + exchangeCharges) * CHARGE_RATES.GST;
    const sebi = (turnover / 10000000) * CHARGE_RATES.SEBI_CHARGES_PER_CRORE;
    
    const totalCharges = brokerage + stt + exchangeCharges + gst + sebi;
    const grossPnl = watchAction === 'BUY' 
      ? ((watchExitPrice || 0) - (watchEntryPrice || 0)) * (watchLots || 0) * watch('lot_size')
      : ((watchEntryPrice || 0) - (watchExitPrice || 0)) * (watchLots || 0) * watch('lot_size');
    
    return {
      brokerage,
      stt,
      exchangeCharges,
      gst,
      sebi,
      totalCharges,
      grossPnl,
      netPnl: grossPnl - totalCharges
    };
  };

  const charges = calculateCharges();

  const onSubmit = async (data: TradeFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await apiClient('/trades', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          brokerage: charges.brokerage,
          stt: charges.stt,
          exchange_charges: charges.exchangeCharges,
          gst: charges.gst,
          sebi_charges: charges.sebi,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      router.push("/app/trades");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep(Math.min(step + 1, totalSteps));
  const prevStep = () => setStep(Math.max(step - 1, 1));

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 w-full h-1 bg-border/50 -z-10"></div>
          <div className="absolute left-0 top-1/2 h-1 bg-primary -z-10 transition-all duration-300" style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}></div>
          
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 ${step >= i ? 'bg-primary border-[#0c0c0e] text-primary-foreground' : 'bg-slate-800 border-[#0c0c0e] text-muted-foreground'}`}>
                {step > i ? <CheckCircle2 className="h-5 w-5" /> : i}
              </div>
              <span className={`text-xs mt-2 font-medium ${step >= i ? 'text-white' : 'text-muted-foreground'}`}>
                {i === 1 ? 'Basics' : i === 2 ? 'Execution' : 'Review'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="bg-[#0c0c0e] border-border/50">
          <CardHeader>
            <CardTitle className="text-xl text-white">
              {step === 1 ? 'Trade Basics' : step === 2 ? 'Execution Details' : 'Review & Tags'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-white">Underlying</Label>
                    <select 
                      {...register("underlying")}
                      className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {isLoadingSymbols ? (
                        <option>Loading symbols...</option>
                      ) : (
                        <>
                          <optgroup label="Indices">
                            {symbols?.indices.map(s => (
                              <option key={s.symbol} value={s.symbol}>{s.name}</option>
                            ))}
                          </optgroup>
                          <optgroup label="Stocks">
                            {symbols?.stocks.map(s => (
                              <option key={s.symbol} value={s.symbol}>{s.symbol} - {s.name}</option>
                            ))}
                          </optgroup>
                          <option value="CUSTOM">Custom / Other</option>
                        </>
                      )}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Action</Label>
                    <div className="flex gap-2">
                      <Button 
                        type="button"
                        variant={watchAction === 'BUY' ? 'default' : 'outline'}
                        className="flex-1"
                        onClick={() => setValue('action', 'BUY')}
                      >Buy</Button>
                      <Button 
                        type="button"
                        variant={watchAction === 'SELL' ? 'destructive' : 'outline'}
                        className="flex-1"
                        onClick={() => setValue('action', 'SELL')}
                      >Sell</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Instrument Type</Label>
                    <select 
                      {...register("instrument_type")}
                      className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="CE">CE (Call)</option>
                      <option value="PE">PE (Put)</option>
                      <option value="FUT">FUT (Future)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Strike Price</Label>
                    <Input 
                      type="number" 
                      placeholder="e.g. 45000" 
                      className="bg-slate-900 border-slate-800 text-white" 
                      {...register("strike_price", { valueAsNumber: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Expiry Date</Label>
                    <Input 
                      type="date" 
                      className="bg-slate-900 border-slate-800 text-white" 
                      {...register("expiry_date")}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-white">Entry Date & Time</Label>
                    <Input 
                      type="datetime-local" 
                      className="bg-slate-900 border-slate-800 text-white" 
                      {...register("entry_datetime")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Entry Price</Label>
                    <Input 
                      type="number" 
                      step="0.05"
                      placeholder="₹" 
                      className="bg-slate-900 border-slate-800 text-white" 
                      {...register("entry_price", { valueAsNumber: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Exit Date & Time</Label>
                    <Input 
                      type="datetime-local" 
                      className="bg-slate-900 border-slate-800 text-white" 
                      {...register("exit_datetime")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Exit Price</Label>
                    <Input 
                      type="number" 
                      step="0.05"
                      placeholder="₹" 
                      className="bg-slate-900 border-slate-800 text-white" 
                      {...register("exit_price", { valueAsNumber: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Number of Lots</Label>
                    <Input 
                      type="number" 
                      placeholder="e.g. 2" 
                      className="bg-slate-900 border-slate-800 text-white" 
                      {...register("lots", { valueAsNumber: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Lot Size</Label>
                    <Input 
                      type="number" 
                      className="bg-slate-900 border-slate-800 text-muted-foreground" 
                      {...register("lot_size", { valueAsNumber: true })}
                      readOnly={watchUnderlying !== 'CUSTOM'}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 grid grid-cols-2 gap-y-3 gap-x-8 text-sm">
                  <div className="flex justify-between border-b border-border/30 pb-1">
                    <span className="text-muted-foreground">Gross P&L:</span> 
                    <span className={`font-semibold ${charges.grossPnl >= 0 ? 'text-green-500' : 'text-red-400'}`}>
                      {formatCurrency(charges.grossPnl)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-border/30 pb-1">
                    <span className="text-muted-foreground">Brokerage:</span> 
                    <span className="text-red-400">{formatCurrency(charges.brokerage)}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/30 pb-1">
                    <span className="text-muted-foreground">STT:</span> 
                    <span className="text-red-400">{formatCurrency(charges.stt)}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/30 pb-1">
                    <span className="text-muted-foreground">GST (18%):</span> 
                    <span className="text-red-400">{formatCurrency(charges.gst)}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/30 pb-1">
                    <span className="text-muted-foreground">Exchange/SEBI:</span> 
                    <span className="text-red-400">{formatCurrency(charges.exchangeCharges + charges.sebi)}</span>
                  </div>
                  <div className="flex justify-between pt-1 col-span-2">
                    <span className="text-white font-bold">Net P&L:</span> 
                    <span className={`font-bold text-lg ${charges.netPnl >= 0 ? 'text-green-500' : 'text-red-400'}`}>
                      {formatCurrency(charges.netPnl)}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white">Strategy Tag</Label>
                  <select 
                    {...register("strategy_tag")}
                    className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select Strategy</option>
                    <option value="Momentum">Momentum</option>
                    <option value="Trend Following">Trend Following</option>
                    <option value="Breakout">Breakout</option>
                    <option value="Mean Reversion">Mean Reversion</option>
                    <option value="Theta Decay">Theta Decay</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white">Trade Notes (Markdown)</Label>
                  <textarea 
                    {...register("notes")}
                    rows={4} 
                    placeholder="Why did you take this trade? Did you follow your rules?" 
                    className="flex w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            )}

          </CardContent>
          <CardFooter className="flex justify-between border-t border-border/50 pt-6">
            <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1} className="bg-transparent border-slate-700 text-white">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            
            {step < totalSteps ? (
              <Button type="button" onClick={nextStep} className="bg-primary text-primary-foreground hover:bg-primary/90">
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" className="bg-green-500 text-white hover:bg-green-600" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <><CheckCircle2 className="mr-2 h-4 w-4" /> Save Trade</>}
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}