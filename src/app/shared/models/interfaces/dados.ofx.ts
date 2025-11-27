export interface OfxData {
  CREDITCARDMSGSRSV1: {
    CCSTMTTRNRS: {
      CCSTMTRS: {
        BANKTRANLIST: {
          STMTTRN: OfxTransacao[];
        };
      };
    };
  };
}

export interface OfxTransacao {
  TRNAMT: string;
  DTPOSTED: string;
  DTUSER?: string;
  MEMO?: string;
  FITID?: string;
  TRNTYPE?: string;
}

export interface OfxResponse {
  dados: {
    OFX: {
      CREDITCARDMSGSRSV1?: {
        CCSTMTTRNRS?: {
          CCSTMTRS?: {
            BANKTRANLIST?: {
              STMTTRN?: OfxTransacao[];
            };
          };
        };
      };
    };
  };
}
