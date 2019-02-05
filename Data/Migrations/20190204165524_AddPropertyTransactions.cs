using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FixerTest.Data.Migrations
{
    public partial class AddPropertyTransactions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PropertyTransactions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Period = table.Column<int>(nullable: false),
                    PrefCode = table.Column<int>(nullable: false),
                    CityCode = table.Column<int>(nullable: false),
                    NearestStation = table.Column<string>(maxLength: 30, nullable: true),
                    TradePrice = table.Column<decimal>(nullable: false),
                    FloorPlan = table.Column<string>(maxLength: 20, nullable: true),
                    Area = table.Column<string>(maxLength: 20, nullable: true),
                    BuildingYear = table.Column<string>(maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PropertyTransactions", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PropertyTransactions");
        }
    }
}
