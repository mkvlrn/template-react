#!/usr/bin/env bash
#MISE description="Start the Vite development server"

set -euo pipefail

mise exec -- vp dev "$@"
