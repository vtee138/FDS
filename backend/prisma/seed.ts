/**
 * Authentication data is created through registration, OAuth, and anonymous
 * visitor requests. No seed rows are appropriate for the two-table design.
 */
async function main() {}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
