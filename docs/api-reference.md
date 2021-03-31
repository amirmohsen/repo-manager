# API Reference

## CLI commands

**Command**: commit

**Description**: Commit message to one, multiple or all scopes

**Usage**: `reman commit [...OPTIONS]`

| Option   | Alias | Type    | Required | Default | Description                            |
| -------- | ----- | ------- | -------- | ------- | -------------------------------------- |
| message  | m     | string  | false    |         | commit message                         |
| type     | t     | string  | false    |         | commit type                            |
| scopes   | s     | boolean | false    | false   | all scopes                             |
| root     | r     | boolean | false    | false   | root (no scope)                        |
| all      | a     | boolean | false    | false   | all scopes and root (no scope)         |
| breaking | b     | boolean | false    |         | breaking changes                       |
| dry      | d     | boolean | false    | false   | dry mode (it does not commit anything) |
