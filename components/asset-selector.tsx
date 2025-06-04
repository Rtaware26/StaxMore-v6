"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AssetService, type Asset } from "@/lib/asset-service"
import { Search } from "lucide-react"

interface AssetSelectorProps {
  selectedSymbol: string
  onSymbolChange: (symbol: string, asset: Asset | null) => void
}

export function AssetSelector({ selectedSymbol, onSymbolChange }: AssetSelectorProps) {
  const [assets, setAssets] = useState<Asset[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const assetsData = await AssetService.getActiveAssets()
        setAssets(assetsData)
      } catch (error) {
        console.error("Error loading assets:", error)
      } finally {
        setLoading(false)
      }
    }

    loadAssets()
  }, [])

  const filteredAssets = assets.filter(
    (asset) =>
      asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const groupedAssets = filteredAssets.reduce(
    (groups, asset) => {
      const key = asset.asset_class
      if (!groups[key]) {
        groups[key] = []
      }
      groups[key].push(asset)
      return groups
    },
    {} as Record<string, Asset[]>,
  )

  const handleAssetSelect = (symbol: string) => {
    const asset = assets.find((a) => a.symbol === symbol) || null
    onSymbolChange(symbol, asset)
  }

  if (loading) {
    return (
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Loading assets..." />
        </SelectTrigger>
      </Select>
    )
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search assets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>

      <Select value={selectedSymbol} onValueChange={handleAssetSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select an asset" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(groupedAssets).map(([assetClass, classAssets]) => (
            <div key={assetClass}>
              <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground capitalize">{assetClass}</div>
              {classAssets.map((asset) => (
                <SelectItem key={asset.symbol} value={asset.symbol}>
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium">{asset.symbol}</span>
                    <span className="text-sm text-muted-foreground ml-2">{asset.name}</span>
                  </div>
                </SelectItem>
              ))}
            </div>
          ))}
        </SelectContent>
      </Select>

      {selectedSymbol && (
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="capitalize">
            {assets.find((a) => a.symbol === selectedSymbol)?.asset_class}
          </Badge>
          <span className="text-sm text-muted-foreground">{assets.find((a) => a.symbol === selectedSymbol)?.name}</span>
        </div>
      )}
    </div>
  )
}
