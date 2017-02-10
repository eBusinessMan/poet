import 'reflect-metadata'

import BlockchainService from '../../domainService'
import Route from '../route'
import BlockInfo from '../../orm/blockInfo'
import { QueryBuilder } from 'typeorm'
import { QueryOptions } from '../route'

export default class BlockRoute extends Route<BlockInfo> {
  service: BlockchainService

  constructor(service: BlockchainService) {
    super(service.blockInfoRepository, 'blocks')
    this.service = service
  }

  async prepareItem(item: BlockInfo) {
    if (item.hash) {
      return { ...item, id: item.hash }
    } else {
      const clone = { ...item }
      delete clone.id
      return clone
    }
  }

  async getItem(id: string) {
    const blockInfo = await this.service.blockInfoRepository.findOne({
      hash: id
    })
    const block = await this.service.getBlock(id)

    return { ...blockInfo, ...block}
  }

  ownFilter(queryBuilder: QueryBuilder<BlockInfo>, opts: QueryOptions): QueryBuilder<BlockInfo> {
    return queryBuilder
      .orderBy('item.height', 'DESC')
  }
}
