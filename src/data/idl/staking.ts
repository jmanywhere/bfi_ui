export type BfiStaking = {
  "version": "0.1.0",
  "name": "bfi_staking",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "status",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "stake",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "status",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingPosition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "poolId",
          "type": "u8"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "claim",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "status",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingPosition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "poolId",
          "type": "u8"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "status",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingPosition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "poolId",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createPool",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "newPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "status",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "poolId",
          "type": "u8"
        },
        {
          "name": "basisPoints",
          "type": "u32"
        },
        {
          "name": "lockTime",
          "type": "i64"
        }
      ]
    },
    {
      "name": "setPoolActiveStatus",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "status",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "poolId",
          "type": "u8"
        },
        {
          "name": "activeState",
          "type": "bool"
        }
      ]
    },
    {
      "name": "claimEarlyFee",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "status",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "transferOwnership",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "status",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newOwner",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setPoolLockTime",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "status",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "poolId",
          "type": "u8"
        },
        {
          "name": "newLockTime",
          "type": "i64"
        }
      ]
    },
    {
      "name": "setPoolApr",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "status",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "poolId",
          "type": "u8"
        },
        {
          "name": "basisPoints",
          "type": "u32"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "status",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalStaked",
            "type": "u64"
          },
          {
            "name": "totalPools",
            "type": "u8"
          },
          {
            "name": "token",
            "type": "publicKey"
          },
          {
            "name": "earlyCollectedFee",
            "type": "u64"
          },
          {
            "name": "owner",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "poolInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "basisPoints",
            "type": "u32"
          },
          {
            "name": "lockTime",
            "type": "i64"
          },
          {
            "name": "isActive",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "stakingPosition",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "lockAmount",
            "type": "u64"
          },
          {
            "name": "claimed",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidInputValues",
      "msg": "Check input values"
    },
    {
      "code": 6001,
      "name": "InvalidPoolId",
      "msg": "Invalid pool id"
    },
    {
      "code": 6002,
      "name": "InvalidTokenAccount",
      "msg": "Invalid token account"
    },
    {
      "code": 6003,
      "name": "NoTokens",
      "msg": "No tokens"
    },
    {
      "code": 6004,
      "name": "TransferError",
      "msg": "Error transfering tokens"
    },
    {
      "code": 6005,
      "name": "AlreadyInitialized",
      "msg": "Already initialized"
    },
    {
      "code": 6006,
      "name": "NothingToClaim",
      "msg": "Nothing to Claim"
    },
    {
      "code": 6007,
      "name": "MintError",
      "msg": "Error while trying to mint tokens"
    },
    {
      "code": 6008,
      "name": "NotOwner",
      "msg": "Is not owner"
    },
    {
      "code": 6009,
      "name": "InactivePool",
      "msg": "Inactive pool"
    }
  ]
};

export const IDL: BfiStaking = {
  "version": "0.1.0",
  "name": "bfi_staking",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "status",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "stake",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "status",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingPosition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "poolId",
          "type": "u8"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "claim",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "status",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingPosition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "poolId",
          "type": "u8"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "status",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingPosition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "poolId",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createPool",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "newPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "status",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "poolId",
          "type": "u8"
        },
        {
          "name": "basisPoints",
          "type": "u32"
        },
        {
          "name": "lockTime",
          "type": "i64"
        }
      ]
    },
    {
      "name": "setPoolActiveStatus",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "status",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "poolId",
          "type": "u8"
        },
        {
          "name": "activeState",
          "type": "bool"
        }
      ]
    },
    {
      "name": "claimEarlyFee",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "status",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "transferOwnership",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "status",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newOwner",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setPoolLockTime",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "status",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "poolId",
          "type": "u8"
        },
        {
          "name": "newLockTime",
          "type": "i64"
        }
      ]
    },
    {
      "name": "setPoolApr",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "status",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "poolId",
          "type": "u8"
        },
        {
          "name": "basisPoints",
          "type": "u32"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "status",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalStaked",
            "type": "u64"
          },
          {
            "name": "totalPools",
            "type": "u8"
          },
          {
            "name": "token",
            "type": "publicKey"
          },
          {
            "name": "earlyCollectedFee",
            "type": "u64"
          },
          {
            "name": "owner",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "poolInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "basisPoints",
            "type": "u32"
          },
          {
            "name": "lockTime",
            "type": "i64"
          },
          {
            "name": "isActive",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "stakingPosition",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "lockAmount",
            "type": "u64"
          },
          {
            "name": "claimed",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidInputValues",
      "msg": "Check input values"
    },
    {
      "code": 6001,
      "name": "InvalidPoolId",
      "msg": "Invalid pool id"
    },
    {
      "code": 6002,
      "name": "InvalidTokenAccount",
      "msg": "Invalid token account"
    },
    {
      "code": 6003,
      "name": "NoTokens",
      "msg": "No tokens"
    },
    {
      "code": 6004,
      "name": "TransferError",
      "msg": "Error transfering tokens"
    },
    {
      "code": 6005,
      "name": "AlreadyInitialized",
      "msg": "Already initialized"
    },
    {
      "code": 6006,
      "name": "NothingToClaim",
      "msg": "Nothing to Claim"
    },
    {
      "code": 6007,
      "name": "MintError",
      "msg": "Error while trying to mint tokens"
    },
    {
      "code": 6008,
      "name": "NotOwner",
      "msg": "Is not owner"
    },
    {
      "code": 6009,
      "name": "InactivePool",
      "msg": "Inactive pool"
    }
  ]
};