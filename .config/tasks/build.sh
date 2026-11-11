#!/usr/bin/env bash
#MISE description="Build for production with Vite"

set -euo pipefail

mise exec -- vp build "$@"
