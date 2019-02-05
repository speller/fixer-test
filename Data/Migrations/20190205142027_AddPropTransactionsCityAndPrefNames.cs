using Microsoft.EntityFrameworkCore.Migrations;

namespace FixerTest.Data.Migrations
{
    public partial class AddPropTransactionsCityAndPrefNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CityName",
                table: "PropertyTransactions",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PrefName",
                table: "PropertyTransactions",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CityName",
                table: "PropertyTransactions");

            migrationBuilder.DropColumn(
                name: "PrefName",
                table: "PropertyTransactions");
        }
    }
}
